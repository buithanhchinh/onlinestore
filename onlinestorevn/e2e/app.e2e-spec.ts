import { OnlinestorevnPage } from './app.po';

describe('onlinestorevn App', () => {
  let page: OnlinestorevnPage;

  beforeEach(() => {
    page = new OnlinestorevnPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
