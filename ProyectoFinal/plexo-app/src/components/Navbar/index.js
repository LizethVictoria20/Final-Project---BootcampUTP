function Navbar() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          {/* button para menú colapsado */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/">Link</a>
            </li>
            <li className="dropdown">
              <a
                href="/"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/">Action</a>
                </li>
                <li>
                  <a href="/">Another action</a>
                </li>
                <li>
                  <a href="/">Something else here</a>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <a href="/">Separated link</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
