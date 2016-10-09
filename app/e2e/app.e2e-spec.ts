import { BaseProjectPage } from './app.po';

describe('base-project App', function() {
  let page: BaseProjectPage;

  beforeEach(() => {
    page = new BaseProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
