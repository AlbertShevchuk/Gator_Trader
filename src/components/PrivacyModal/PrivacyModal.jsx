/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien
PrivacyModal is the disclosure and policy agreement that is displayed when the user
clicks Terms & Agreements button on our registration form. It displays the disclosures
and policies for this website.
*/
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PrivacyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button outline color="info" onClick={this.toggle}>Terms & Agreement Policy</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Privacy Policy</ModalHeader>
          <ModalBody>
            <p>Your privacy is important to us. It is GatorTrader's policy to respect your privacy regarding any information we may collect from you across our website, <a href="http://gatortrader.herokuapp.com">http://gatortrader.herokuapp.com</a>, and other sites we own and operate.</p>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
            <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
            <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
            <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
            <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
            <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
            <p>This policy is effective as of 20 December 2018.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Agree</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PrivacyModal;
