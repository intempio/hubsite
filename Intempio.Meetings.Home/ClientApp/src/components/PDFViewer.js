import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PDFViewer extends Component {



    constructor(props) {
        super(props);

        this.state = { videourl: '', name: '', loading: true, numPages: 0 };
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    componentDidMount() {

        var url = new URL(window.location);
        var vurl = url.searchParams.get("vurl");
        var vname = url.searchParams.get("name");
        var agrel = { url: this.props.url }
        if (!this.props.url)
            agrel = { url: 'https://intempioevetns.blob.core.windows.net/demohub/lorem-ipsum1.pdf' }
       
        this.setState({ videourl: agrel, name: this.props.cname, loading: false, pageNumber: 1 });

    }

    render() {

        return (

            <>
                <div class="skeleton-video" style={{ display: this.state.loading ? "" : "none" }}>
                    <h3 class="skelleton-loading">Watch Again</h3>
                    <div class="skeleton-video-content">
                        <div class="skelleton-loading  skeleton-video-last-wrapper">
                            <div class="video-last"></div>
                        </div>
                        <div class="posts">
                            <form>
                                <div class="skelleton-loading  posts-creator">
                                    <div class="skel-img"></div>
                                    <div class="skel-input"></div>
                                    <div class="skel-button"></div>
                                </div>
                            </form>
                            <div class="skelleton-loading  posts-item">
                                <div class="header">
                                    <div class="header-content">
                                        <div class="header-avatar">
                                            <div class="skel-con"></div>
                                        </div>
                                        <div class="header-info">
                                            <div class="user-name">
                                                John Doe
                    </div>
                                            <div class="date">
                                                <span>Nov 19th, 2019, at 14:00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-more">
                                    </div>
                                </div>
                                <p class="information">
                                    Here is one of previously written comments.
              </p>
                                <div class="posts-item-image">
                                    <div class="skel-img"></div>
                                </div>
                                <div class="popularity">
                                    <div class="popularity-item">
                                    </div>
                                    <div class="vertical-line"></div>
                                    <div class="popularity-item">
                                    </div>
                                </div>
                                <form>
                                    <div class="footer">
                                        <div class="skel-img"></div>
                                        <div class="skel-input"></div>
                                        <div class="skel-button"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pdf-main" id={this.props.category} >
                    <h3>{this.state.name}</h3>

                    <div class="pdf-container">

                        <div class="pdf-conent">

                            <Document size="A4" file={this.state.videourl} onContextMenu={(e) => e.preventDefault()} className="pdf-container" onLoadSuccess={this.onDocumentLoad}>
                                <Page pageNumber={this.state.pageNumber} scale={2.0}  />
                            </Document>

                        </div>


                        <div className="pdf-pagination">
                            <button onClick={() => this.setState({ pageNumber: this.state.pageNumber > 1 ? this.state.pageNumber - 1 : this.state.numPages })}>
                                {'<<'}
                            </button>
                            {' ' + this.state.pageNumber + ' '}

                            <button onClick={() => this.setState({ pageNumber: this.state.pageNumber < this.state.numPages ? this.state.pageNumber + 1 : 1 })}>
                                {'>>'}
                            </button> </div>
                    </div>


                </div>
            </>
        )
    }
}

