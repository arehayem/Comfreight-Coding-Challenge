import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {
    const pages = [
      {
        name: 'Upload',
        path: 'upload'
      },
      {
        name: 'Credit',
        path: 'credit'
      },
      {
        name: 'History',
        path: 'history'
      }
    ];

    return (
      <Router>
        <div className="App">
          <div className="top-bar"></div>
          <Nav pages={pages}/>
          <Route exact path="/" component={Index}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/credit" component={Credit}/>
          <Route path="/history" component={History}/>
        </div>
      </Router>
    );
  }
}

const Index = () => {
  return (
    <div className="page--index">Index Page</div>
  )
}

const Credit = () => {
  return (
    <div className="page--credit">Credit Page</div>
  )
}

class Nav extends Component {
  render() {
    const {pages} = this.props;
    return (
      pages ? (
        <ul className="navigation">
          {
            pages.map(page => (
              <li key={page.path}>
                <NavLink exact className="nav-link" activeClassName="active" to={`/${page.path}`}>
                  {page.name}
                </NavLink>
              </li>
            ))
          }
        </ul>
      ) : (
        <div>No Page...</div>
      )
    )
  }
}

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalNo: "",
      cards: [
        {
          status: "Paid",
          date: "Thursday, April 13 2018",
          invoice_number: 8082,
          total: 124.04,
          to_be_paid: 105.04,
          bill_to: "Schneider National Carrier",
          from_address: "2913 Millenium Cir, Long Beach CA 20929",
          to_address: "234 Monrdth Ave, Sacramento CA 10029",
          rate: 0.03,
          load_number: 12455,
          type: "V",
          load_length: 53,
          company_phone: "(424) 424-4555"
        },
        {
          status: "Requested",
          date: "Thursday, April 13 2018",
          invoice_number: 802,
          total: 300,
          to_be_paid: 300,
          bill_to: "Schneider National Carrier",
          from_address: "2913 Millenium Cir, Long Beach CA 20929",
          to_address: "234 Monrdth Ave, Sacramento CA 10029",
          rate: 0.03,
          load_number: 12405,
          type: "V",
          load_length: 53,
          company_phone: "(424) 424-4555"
        },
        {
          status: "Declined",
          date: "Thursday, April 13 2018",
          invoice_number: 4032,
          total: 100,
          to_be_paid: "",
          bill_to: "Schneider National Carrier",
          from_address: "2913 Millenium Cir, Long Beach CA 20929",
          to_address: "234 Monrdth Ave, Sacramento CA 10029",
          rate: 0.03,
          load_number: 12405,
          type: "V",
          load_length: 53,
          company_phone: "(424) 424-4555"
        },
        {
          status: "Paid",
          date: "Thursday, April 13 2018",
          invoice_number: 4033,
          total: 100,
          to_be_paid: 100,
          bill_to: "Schneider National Carrier",
          from_address: "2913 Millenium Cir, Long Beach CA 20929",
          to_address: "234 Monrdth Ave, Sacramento CA 10029",
          rate: 0.03,
          load_number: 12406,
          type: "V",
          load_length: 53,
          company_phone: "(424) 424-4555"
        },
      ]
    }
  }

  showModal = (id) => {
    this.setState(
      {
        showModal: true,
        modalNo: id
      }
    );
  }

  hideModal = () => {
    this.setState({showModal: false});
  }

  render() {
    const {cards} = this.state;
    const modalCard = cards.find((card) => {
      return card.invoice_number === this.state.modalNo;
    });

    return (
      <div>
        <div className="page--history">
          {cards.length > 0 &&
            <ul>
              {cards.map((card) =>
                <Card key={card.invoice_number} data={card} showModal={this.showModal} />
              )}
            </ul>
          }
        </div>
        {this.state.modalNo &&
          <Modal show={this.state.showModal} data={modalCard} handleClose={this.hideModal} />
        }
      </div>
    )
  }
}

class Card extends Component {

  clickModal = () => {
    this.props.showModal(this.props.data.invoice_number);
  }

  render() {
    const data = this.props.data;

    return (
      <div className="history--card">
        <div className="card--text">
          <h2>{data.bill_to}</h2>
          <p>${data.total}</p>
          <div>
            <p>{data.from_address}</p>
            <p>{data.to_address}</p>
          </div>
          <button onClick={this.clickModal}>Details</button>
        </div>
        <div className={`card--status ${data.status}`}>
          <h2>{data.status}</h2>
          <h3>{data.date}</h3>
        </div>
      </div>
    )
  }
}

class Modal extends Component {
  render() {
    const showHideClassName = this.props.show ? 'display-block' : 'display-none';
    const data = this.props.data;

    return (
      <div>
        <div className={`modal ${showHideClassName}`}>
          <div className={`modal--status ${data.status}`}>
            <p>{data.status}</p>
            <p>{data.date}</p>
            <div>
              <p className="modal--invoice">Invoice No {data.invoice_number}</p>
              <h2 className="modal--total">${data.total}</h2>
            </div>
          </div>
          <div className="modal--text">
            {data.status === "Declined" &&
              <div className="modal--warning">
                <p>We were unable to identify the documents</p>
                <p>Please call us (424) 315-2553</p>
              </div>
            }
            <p>Billed To: {data.bill_to}</p>
            <img className="modal--image" alt="map_image" />
            <p>Rate: {data.rate}</p>
            <p>Load No: {data.load_number}</p>
            <p>Type: {data.type}</p>
            <p>Load Length: {`${data.load_length} ft`}</p>
            <p>Company Phone: {data.company_phone}</p>
            {data.status !== "Declined" &&
              <p>{data.status === "Paid" ? "Total Paid: " : "Total To Pay: "} ${data.to_be_paid}</p>
            }
            <button className="modal--back-button" onClick={this.props.handleClose}>Back</button>
          </div>
        </div>
        <div className={`modal-overlay ${showHideClassName}`}>
        </div>
      </div>
    )
  }
}

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice_amount: "",
      bill_to_company: "",
      bill_to_address: "",
      pick_up: "",
      destination: "",
      load_number: "",
      equipment_type: "option1",
      load_length: "",
      wire_transfer: true,
      results: {
        rate: 0.03,
        total: ""
      }
    };

    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  onSearchSubmit() {
    console.log(this.state);
  }

  onSearchValueChange(id, value) {
    this.setState((state) => {
      return {[id]: value};
    });

    this.setState((state) => {
      const fee = state.wire_transfer ? 25 : 0;
      return {
        results: {
          rate: state.results.rate,
          total: state.invoice_amount * (1 - state.results.rate) - fee
        }
      };
    });
  }

  render() {
    return (
      <div className="page--upload">
        <UploadForm
          onChange={this.onSearchValueChange}
          onSubmit={this.onSearchSubmit}
          value={this.state}
        />
      </div>
    )
  }
}

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.props.onChange(id, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div id="left-panel">
            <label>
            Upload your Documents 
              <input type="file" id="upload_documents" />
            </label>
            <label>
            Total Invoice Amount 
              <input type="number" id="invoice_amount" value={this.props.value.invoice_amount} onChange={this.handleChange} required />
            </label>
            <label>
            Bill To Company 
              <input type="text" id="bill_to_company" value={this.props.value.bill_to_company} onChange={this.handleChange} required />
            </label>
            <label>
            Bill To Company Address 
              <input type="text" id="bill_to_address" value={this.props.value.bill_to_address} onChange={this.handleChange} required />
            </label>
            <label>
            First Pick Up 
              <input type="text" id="pick_up" value={this.props.value.pick_up} onChange={this.handleChange} required />
            </label>
            <label>
            Final Destination 
              <input type="text" id="destination" value={this.props.value.destination} onChange={this.handleChange} required />
            </label>
          </div>
          <div id="right-panel">
            <label>
            Load Number 
              <input type="number" id="load_number" value={this.props.value.load_number} onChange={this.handleChange} required />
            </label>
            <label>
            Equipment Type 
              <select id="equipment_type" value={this.props.value.equipment_type} onChange={this.handleChange} required>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </label>
            <label>
            Load Length 
              <input type="number" id="load_length" value={this.props.value.load_length} onChange={this.handleChange} required />
            </label>
            <label>
            Wire Transfer Needed ($25)
              <input type="checkbox" id="wire_transfer" checked={this.props.value.wire_transfer} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <div id="form-results">
              <p>Your Rate: {this.props.value.results.rate}</p>
              <p>Total To Be Paid: {this.props.value.results.total}</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
