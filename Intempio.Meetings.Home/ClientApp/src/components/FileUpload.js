import React, { Component } from 'react';
import Events from './events';
export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, uploadfolder:'#'};
    }


    async getSettings() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetMeetingInfo', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item && item.value[0].fields.Uploadfolder) {

                this.setState({ uploadfolder: item.value[0].fields.Uploadfolder});
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            this.setState({ loading: false });
            return false;
        });
        return finalresult;
    }


    async upload(e) {
        let token = localStorage.getItem('userToken')
        let email = '';
        token = JSON.parse(token);
        if (token) {
            email = token.email;
        }
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("formFile", e.target.files[0]);

        const response = await fetch('Meeting/UploadVideo?email=' + email + '&blobcontainer=' + this.state.uploadfolder, {
            method: "POST",
            body: formData

        });

        const finalresult = await response.json().then((resonse) => {
            this.setState({ loading: false });
            return true;

        }).catch((error) => {
            return true;
        });

        return finalresult;
    }




    componentDidMount() {

        this.getSettings();
    }
    render() {

        return (

            <>

               

                    <main>
                        <div >
                            <Events buttonStatus="false" />
                            <h3>Upload a Video</h3>
                        <div class="file-Upload-container">
                            <input type="file" onChange={this.upload.bind(this)} disabled={this.state.uploadfolder=='#' }/>
                            {this.state.loading && <div class="sessions-item">Please Wait...</div>}
                            </div>
                        </div>
                    </main>
          
            </>

        )
    }
}

