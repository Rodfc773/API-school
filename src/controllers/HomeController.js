class HomeController {
  async index(req, res) {
    res.send('Index');
  }
}
export default new HomeController();
