import { Opgave3Page } from './app.po';

describe('opgave3 App', function() {
  let page: Opgave3Page;

  beforeEach(() => {
    page = new Opgave3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
