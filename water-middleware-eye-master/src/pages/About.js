import React from "react";
import {Header} from "../components/Header";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import "../static/styles/about.css";
import eutLogo from "../static/img/eut_logo.jpg";


export const About = () => {
  return (
      <>
          <Header title={'Meet the IMAQUA Water Middleware Team'}/>
          <Jumbotron className={'jumbotron-color-transparent'} fluid>
              <Container>
                  <img
                      src={eutLogo}
                      className="d-inline-block"
                      alt="Eurecat logo"
                  />
                  <p>
                      Eurecat is the result of a merger, starting in 2015, between Catatonia’s main technology centres. Eurecat’s technical contribution to the project counts on the Sustainability and Energy Unit, and its goal is to carry out R&D&i activities and technology development to boost competitiveness and sustainability in companies. La Unitat disposa d’equipament científic per a anàlisis químiques, proves de membrana, tractament d’aigua i residus, anàlisi microbiològica, energia, sòls i ecologia industrial. La subunitat de Water Technologies centra les seves activitats en l’estudi i el desenvolupament de proves de validació de tecnologies d’aigua de gran abast per a una gestió eficient de l’aigua, en la gestió eficient de l’aigua dins del cicle urbà i industrial, i la selecció i avaluació de tecnologies de tractament d’aigua, incloent la neteja, la regeneració i la reutilització.
                      It also counts on the Smart Management Systems Unit which develops innovative solutions (algorithms, methods, platforms) based on a combination of AI technologies and knowledge management such as: applying new technologies for developing rapid-alert systems and a support system for taking decisions for water monitoring; modelling and developing distributed water governance and management systems to the urban, industrial and rural water systems’ various players; algorithms for the predictive determination of water-consumption profiles and obtaining knowledge based on existing databases; and a simulation tool integrated into governance, management and support systems in decisions on rural, urban and industrial areas.
                  </p>
              </Container>
          </Jumbotron>

      </>
  );
};