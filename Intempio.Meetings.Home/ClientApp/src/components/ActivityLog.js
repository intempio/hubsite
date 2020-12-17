export const ActivityLog = {

    getStringValue:  (email, action, url) => {
        try {
            let formData = new FormData();
        
            formData.append("formFile", email+ '|'+ action + '|'+ url );


            const activityResponse =  fetch('Meeting/AddMeetingUserActivitydetail' , {
                method: "POST",
       
                body: formData
            });

             activityResponse.json().then(() => {
                console.log("Added");
            }).catch((err) => {
                console.log(err);
            });


        } catch (e) {
            // read error
        }
    }
}