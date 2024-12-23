import { When, Then, DataTable } from '@cucumber/cucumber';
import ReturnPage from '../pages/returnpage';
import { getPage } from '../corelib/corelib.spec';

let returnPage: ReturnPage;


When('I initiate a return with the following details', async function (table: DataTable) {  
  returnPage = new ReturnPage(getPage());
  const tableData = table.hashes();
  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    await returnPage.enterData(row);
  }
});
