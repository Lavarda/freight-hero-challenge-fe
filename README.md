# Freight Hero - Frontend test

Your mission is to develop a load management UI, this test is intended to let us know more about your frontend skills, critical thinking, and creativity. Please read carefully the instructions down below and good luck! 🙏

## Context

Freight Hero is a company that provides load management services leveraging the power of AI to automate repetitive tasks and ensure processes involving brokerage are going smoothly.

- **Load** is a common term in the brokerage market to specify what you are transporting.
- **Client** is the company expecting to receive the load.
- **Carrier** is the company in charge of transporting the load.
- **Destination** is the physical place where the load needs to be delivered.
- **Origin** is the physical place where a load needs to be picked up.
- **Status** is used to determine whether a load needs to be picked up, is in transit, or was delivered.

## Requirements

- Using the [mocked json](./public/loads-mock.json), build a load management UI.

  - Fetch the JSON file as if it were from a [real server](http://localhost:3000/loads-mock.json) and use the proper loading states.
  - Include search and filters at the top of the page for all columns.
  - Display the loaded data in a clear and organized table.

- Include a delete action at the right side of each row using a menu.

  - The delete action must have confirmation modal.
  - Once an item is deleted, it must not appear in the table anymore.

- Implement a modal to create loads.

  - Use the same fields you find in the mocked JSON to create the form.
  - The fields must have validation and all of them are required.

## Going Above and Beyond

- Enhance the UI with a modern theme and components.
- Use visually appealing components without disrupting UX.
- Have proper error handling so as not to affect the UI badly.
- Use your creativity to improve the proposed items above.

## Getting Set Up

#### Install

```sh
npm install
```

#### Run

```sh
npm run serve
```

## Submitting

Once your test is done share it using the specified channel within your invitation email or ask the tech recruiter for more details.

Thank you.
