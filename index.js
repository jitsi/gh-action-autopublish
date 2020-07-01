const { Toolkit } = require('actions-toolkit');


Toolkit.run(async tools => {
    await tools.exec('git', ['config', 'user.name', '"Automated Release"']);
    await tools.exec('git', ['config', 'user.email', '"gh-action-autopublish@users.noreply.github.com"']);

    const pkg = tools.getPackageJSON();
    const currentVersion = pkg.version.toString();
    let tagExists;

    try {
        await tools.exec(`git ls-remote --exit-code --tags origin v${currentVersion}`);
        tagExists = true;
    } catch (e) {
        tagExists = false;
    }

    if (tagExists) {
        tools.log.info('Current version has a tag, bumping the patch');
        await tools.exec('npm version patch');
    } else {
        tools.log.info(`Current version does not have a tag, creating it`);
        await tools.exec(`git tag v${currentVersion}`);
    }

    await tools.exec('git push origin master');
    await tools.exec(`git push origin v${tools.getPackageJSON().version.toString()}`);
    await tools.exec('npm publish');

    tools.exit.success('Done!!')
}, { event: 'push' });
