import { Page } from 'playwright';

type role = 
  | 'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'blockquote'
  | 'button' | 'caption' | 'cell' | 'checkbox' | 'code' | 'columnheader'
  | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'deletion'
  | 'dialog' | 'directory' | 'document' | 'emphasis' | 'feed' | 'figure'
  | 'form' | 'generic' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img'
  | 'insertion' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main'
  | 'marquee' | 'math' | 'meter' | 'menu' | 'menubar' | 'menuitem'
  | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note'
  | 'option' | 'paragraph' | 'presentation' | 'progressbar' | 'radio'
  | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar'
  | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status'
  | 'strong' | 'subscript' | 'superscript' | 'switch' | 'tab' | 'table'
  | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'time' | 'timer' | 'toolbar'
  | 'tooltip' | 'tree' | 'treegrid' | 'treeitem';

export default class BasePage {
  protected page: Page;
  protected path: string;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async inPage() {
    await this.page.waitForLoadState('domcontentloaded');
    return this.page.url().endsWith(this.path);
  }

  async navigate() {
    await this.page.goto(process.env.WEB_URL + this.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async hover(loc:any) {
    await this.getLocator(loc).hover();
    console.log('====================================');
    console.log(`Hovered on ${loc['description']}`);
    console.log('====================================');
  }

  async click(loc: any, byRole=false) {
    if (!byRole) {
      await this.getLocator(loc).click(loc['actOptions']);
    } else {
      await this.getLocatorByRole(loc).click();
    }
    console.log('====================================');
    console.log(`Clicked on ${loc['description']}`);
    console.log('====================================');
  }



  async clickRadio(loc: any, value: string) {
    await this.page.locator(loc['locator'].replace('${value}', value), loc['locatorOptions']).click();
    console.log('====================================');
    console.log(`Clicked on ${loc['description']} with value ${value}`);
    console.log('====================================');
  }

  async enter(loc: any, data: string) {
    await this.getLocator(loc).fill(data, loc['actOptions']);
    console.log('====================================');
    console.log(`Entered value ${data} to ${loc['description']}`);
    console.log('====================================');
  }

  getLocator(loc: any) {
    return this.page.locator(loc['locator'], loc['locatorOptions']);
  }

  getLocatorByRole(loc: any) {
    const element = loc['locator'] as role;
    return this.page.getByRole(element, loc['locatorOptions']);
  }

}


