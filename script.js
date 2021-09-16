Survey.StylesManager.applyTheme("bootstrap");

var myCss = {
	page: {
		title: "surveyTitle",
		description: "surveyDescription",
	},
	navigation: {
		start: "surveyStartBtn"
	},
	checkbox: {
		item: "surveyCheckbox"
	},
	radiogroup: {
		item: "surveyRadio"
	},
	navigationButton: "TEST123"
};

var surveyJSON = {
	pages: [
		{
			name: "startPage",
			title: "Get Started",
			description: "Find your Dealerware solution by answering 4 simple question"
		},
		{
			name: "solutions",
			elements: [
				{
					type: "checkbox",
					name: "solution",
					title: "What solutions are you interested in?",
					hideNumber: true,
					isRequired: true,
					choices: [
						{
							value: "retail",
							text: "Retail Rental"
						},
						{
							value: "loaner",
							text: "Loaner Fleet Management"
						},
						{
							value: "program",
							text: "Vehicle Program Management"
						}
					]
				}
			]
		},
		{
			name: "experience",
			elements: [
				{
					type: "radiogroup",
					name: "experience",
					title: "Have you ever used software to manage your fleet before?",
					isRequired: true,
					hideNumber: true,
					choices: [
						{
							value: "yes",
							text: "Yes"
						},
						{
							value: "no",
							text: "No"
						}
					]
				}
			]
		},
		{
			name: "fleet size",
			elements: [
				{
					type: "radiogroup",
					name: "size",
					title: "What is your fleet size?",
					isRequired: true,
					hideNumber: true,
					choices: [
						{
							value: "small",
							text: "0-50"
						},
						{
							value: "middle",
							text: "51-300"
						},
						{
							value: "big",
							text: "301+"
						},
						{
							value: "manufacturer",
							text: "I'm with a manufacturer or dealer group"
						}
					]
				}
			]
		},
		{
			name: "location",
			elements: [
				{
					type: "radiogroup",
					name: "location",
					title: "Where are you located?",
					isRequired: true,
					hideNumber: true,
					choices: [
						{
							value: "us",
							text: "US"
						},
						{
							value: "canada",
							text: "Canada"
						}
					]
				},
				{
					type: "dropdown",
					name: "state",
					visibleIf: "{location} = 'us'",
					title: "Please choose a State",
					isRequired: true,
					hideNumber: true,
					choicesByUrl: {
						url: "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json",
						valueName: "abbreviation",
						titleName: "name"
					}
				}
			]
		}
	],
	completedHtml: "<h2>Your answers</h2><p>{solution}<br />{experience}<br />{size}<br />{location}<br />{state}</p>",
	showProgressBar: "top",
	startSurveyText: "Let's Go",
	pageNextText: "Next question",
	completeText: "View solution"
}

let getSurveyData = () => {
	let data = survey.data;
	const SITE = "https://www.dealerware.com/solutions";
	let solutionString = "?solution=" + data["solution"];
	solutionString += "&experience=" + data["experience"];
	solutionString += "&size=" + data["size"];
	solutionString += "&country=" + data["location"];
	data["state"] ? solutionString += "&state=" + data["state"] : "";
	// window.location = `${SITE}/${solutionString}`;
	console.log(data);
	//document.getElementById('surveyRs').innerHTML = `${SITE}/${solutionString}`;


}

// function sendDataToServer(survey) {
// 	send Ajax request to your web server.
// 	document.getElementById('surveyResult').innerHTML = JSON.stringify(survey.data);
// }

var survey = new Survey.Model(surveyJSON);
survey.firstPageIsStarted = true;

$("#surveyC").Survey({
	model: survey,
	css: myCss,
	onComplete: getSurveyData
});
