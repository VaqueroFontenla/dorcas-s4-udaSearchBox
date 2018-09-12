            import React, { Component } from 'react';
            import PropTypes from 'prop-types';
            import ModalContent from './ModalContent.js';

            class Modal extends Component {
                
                render() {
                    const { placesStatus, cadastreStatus, modalStatus, onCloseModal
                    } = this.props;
                    
                    return (
                      <section>
                            <div>
                                <button 
                                    onClick={onCloseModal}
                                >
                                ✖
                                </button>
                               
                                <span> Mensaje </span>
                            </div>
                    </section>
                    );
                }
            }















            export default Modal;