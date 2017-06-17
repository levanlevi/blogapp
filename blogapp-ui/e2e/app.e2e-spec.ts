import { BlogappUiPage } from './app.po';

describe('blogapp-ui App', function() {
  let page: BlogappUiPage;

  beforeEach(() => {
    page = new BlogappUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
