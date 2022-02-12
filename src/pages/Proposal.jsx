import React, { useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GenQoutes from '../components/GenQoutes';
import { propose, qoutes } from '../data.json';
import { genRandom } from '../utills';

const Proposal = ({ className = '' }) => {
    const { id } = useParams();
    const person = id.split('-').join(' ');

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: '/images/image-05.jpg',
        subtext: 'I want to tell you something',
    });

    const useDummyScroll = useRef(null);

    const addQoutes = () => {
        const qoute = texts.length >= qoutes.length ? propose : genRandom(qoutes, texts);
        setCurrentText((prevData) => ({ ...prevData, ...qoute }));
        setTexts((prevData) => [...prevData, qoute]);

        if (useDummyScroll) {
            useDummyScroll.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
    };

    return (
        <div
            className={`proposal ${className}`}
            style={{
                '--image': `url(${currentText.image})`,
            }}
        >
            <div className="proposal_media bg-dark d-none d-md-block" />
            <Container>
                <Row>
                    <Col md={6} className="ms-auto">
                        <div className="proposal_content py-5">
                            <div className="proposal_header">
                                <h1 className="proposal_title h4">
                                    Hey <b>{person}</b>
                                </h1>
                                <p className="propsal_subtitle">{currentText.subtext}</p>
                            </div>

                            <GenQoutes texts={texts} className="main-content" />

                            <div className="dummyscroll w-100" ref={useDummyScroll} />

                            {currentText.id !== 'finished' ? (
                                <Button variant="danger" onClick={addQoutes}>
                                    {texts.length ? 'Next' : 'Continue'}
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Proposal;
