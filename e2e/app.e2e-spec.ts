import { AmitGhodaSitePage } from './app.po';

describe('amit-ghoda-site App', () => {
  let page: AmitGhodaSitePage;

  beforeEach(() => {
    page = new AmitGhodaSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
