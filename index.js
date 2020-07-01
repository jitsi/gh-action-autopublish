const { Toolkit } = require('actions-toolkit');


Toolkit.run(async tools => {
    await tools.exec('git', ['config', 'user.name', '"Automated Release"']);
    await tools.exec('git', ['config', 'user.email', '"gh-action-autopublish@users.noreply.github.com"']);

    const pkg = tools.getPackageJSON();
    const currentVersion = pkg.version.toString();
    let currentTag;
    const options = {
        listeners: {
            stdout: buffer => {
                currentTag += buffer.toString()
            }
        }
    };

    await tools.exec('git describe --tags').toString();

    if (currentTag && currentTag === `v${currentVersion}`) {
        tools.log.info('Latest tag matches version, bumping the patch');
        await tools.exec('npm version patch');
    } else {
        tools.log.info('Latest tag doesn\'t match the version, setting it');
        await tools.exec(`npm version ${currentVersion} --allow-same-version`);
    }

    await tools.exec('git push origin master');
    await tools.exec(`git push origin v${tools.getPackageJSON().version.toString()}`);
    await tools.exec('npm publish');

    tools.exit.success('Done!!')
}, { event: 'push' });
