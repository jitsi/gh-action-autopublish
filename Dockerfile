FROM node:12-slim

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="AutoPublish"
LABEL "com.github.actions.description"="Automated version bump and publishing for npm packages"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="truck"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="blue"

# Install dependencies
RUN apt-get update && apt-get -y install git

# Copy the rest of your action's code
COPY . .

RUN npm install

# Run `node /index.js`
ENTRYPOINT ["node", "/index.js"]
