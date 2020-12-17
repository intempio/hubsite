export const ActivityLog = {

    getStringValue: async (email, action, url) => {
        try {
            let formData = new FormData();
        
            formData.append("formFile", email+ '|'+ action + '|'+ url );


            const activityResponse = await fetch('Meeting/AddMeetingUserActivitydetail' , {
                method: "POST",
       
                body: formData
            });

            await activityResponse.json().then(() => {
                console.log("Added");
            }).catch((err) => {
                console.log(err);
            });


        } catch (e) {
            // read error
        }
    }
}