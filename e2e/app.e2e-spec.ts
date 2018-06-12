import { TestingDemoPage } from './app.po';

describe('angular-testing-demo App', function() {
  let page: TestingDemoPage;

  beforeEach(() => {
    page = new TestingDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
