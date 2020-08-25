const inquirer = require("inquirer");
const axios = require ("axios");
const fs = require ("fs");
const path = require ("path");
async function main (){
    console.log('starting');
    const userResponse = await inquirer
    .prompt([
        {
            type:"input",
            message: "Please enter your GitHub user name",
            name: "username"
        },
        {
            type:"input",
            message:"Please enter your Project Name",
            name: "projectName"
        },
        {
            type: "input",
            message:"Tell me about your project",
            name:"projectDescription"
        },
        {
            type:"input",
            message:"Tell me the steps you took to create your project and how it can be installed",
            name:"installProcess"
        },
        {
            type:"input",
            message:"How should your project be used by a user",
            name: "instruction"
        },
        {
            type:"input",
            message:"Show me some examples of your project in action",
            name: "projectExample"
        },
        {
            type: "input",
            message: "What is the License name ",
            name:"licenseName"
        },
        {
            type: "input",
            message: "What is the url for the license",
            name:"licenseUrl"
        },
        {
            type: "input",
            message:"Did anyone contribute to your project, if so enter their git hub user names using commas and no spaces",
            name: "contributorsGitUserName"
        },
        {
            type:"input",
            message:"Give me some examples on how you would run a test",
            name: "testExamples"
        }

    ]);

    console.log(`starting`);
        console.log(userResponse);
        const username = userResponse.username;
        const projectTittle = userResponse.projectTittle;
        const projectDescription = userResponse.projectDescription;
        const installProcess = userResponse.installProcess;
        const instruction = userResponse.instruction;
        const projectExample = userResponse.projectExample;
        const licenseName = userResponse.licenseName;
        const licenseUrl = userResponse.licenseUrl;
        const contributorUserNames = userResponse.contributorsGitUserName;
        const testExamples = userResponse.testExamples;
            // fetching data from git
            // user
        const gitResponse = await axios.get(`https://api.github.com/users/${userResponse.username}`);
        const gitData = gitResponse.data;
        const gitName = gitData.login;
        const gitEmail = gitData.email;
        const gitlocation = gitData.location;
        const gitUrl = gitData.html_url;
        const gitProfileImage = gitData.avatar_url;
            // contributor
        const contributorUserNamesArray = contributorUserNames.split(",");
        console.log(contributorUserNamesArray);
        // const  = listOfContributorsUserNames.
        // contributorsGitUserName
        var resultContributor;
        for (i=0; i<contributorUserNamesArray.length; i++){
            var contributorsGitUserName = contributorUserNamesArray[i]
            const gitResponse2 = await axios.get(`https://api.github.com/users/${contributorsGitUserName}`);
            var gitContribuProfileImage = gitResponse2.data.avatar_url;
            var gitContribuUrl = gitResponse2.data.html_url;
            var gitContribuEmail = gitResponse2.data.email;
            var resultContributor = resultContributor + (`
            \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);
        }
        var result = (`
# ${projectTittle} 
${projectDescription}
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Author](#Author)
\n* [TestExamples](#TestExamples)
## Installation
${installProcess}
## Instructions
${instruction}
\`\`\`
${projectExample}
\`\`\`
## License 
This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
## Contributors
${resultContributor}
## TestExamples
${testExamples}
## Author 
\n![ProfileImage](${gitProfileImage})
\n**${gitName}**
\nEmail: ${gitEmail}
\nLocation:${gitlocation}
\nGitHub: ${gitUrl}
`)
var writeResult = fs.writeFileSync(path.join(__dirname, '../GoodReadMeGenerator', 'readMe.md'), result )
console.log("file generated....")
    }
main();
