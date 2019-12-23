## The Process

This project is mainly Material-UI, a custom extended table component called material-table, and of course react and redux.

Material-UI was picked as a component library because it's a quick and painless way to get the ball rolling on your new project. Ironically, the most important front-end component had to be built with a table library with extended functionality: material-table.

I'm trying to stay in the world of react because of all its support from the community. I chose it for that reason and that it's the mose recent framework I've worked with as well.

Redux is the obvious choice for data-binding and state control. Though it's rumored the same functionality can be used with react hooks. Nonetheless it's still widely used.

The testing library I used was jest and react testing library. I don't have much experience in writing unit tests but I think it'd be nice to expand on in the future. If I were to take testing into account in the first place I would have made my components more modular. And my functions more modular as well. The unit tests aren't as complete as I'd like them to be but I've run out of time.

Viewing the API I observed that the data has a limit to return only the first 10 results of daily activity. In order to get a fuller table I extended the limit to 100 just to see more data.

At first I thought the limit was in place as a start for pagination but I was wrong because pagination wouldn't be possible without a way to skip results already requested. Also the results are preprocessed and summarized on the front-end before being put in the table, therefore pagination wouldn't create any benefit.

If the future goal would be to create a source to get summary data of this kind, the logic would need to be put on the server side to avoid having to compute too much on the front-end. The data should also be indexed by date. Then you could have a table just like this but only requesting a date range. Otherwise the data seems arbitrary and is only sorted by the number/id of the photoshoot.

It's important to note the table is breaking down by **photoshoot** not by **client**. However, it seems that client ID's do not repeat in the dataset. But in real life if you wanted to sort by client, you would do exactly what I'm doing but another computation that combines clients (either by type or by day), adds them together, and totals the number of photos for their photoshoot. That way in either of the breakdowns the client wouldn't repeat.

Thanks for reading my process! Here's how to use:

## How to use

It's probably self explanetory, but I though it safe to explain anyway:

Click on the arrow to view details **by type / category**

This will drop down another table to view inline

![alt text](/public/screen1.png "Click on the arrow to view details")

Click on a single day's total to view **by photoshoot**

This will open up a dialog with another table

![alt text](/public/screen2.png "Click on a single day's total to view")

## Scripts

from terminal you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

This will automatically run all the tests


