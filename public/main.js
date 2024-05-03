function deleteJob (id) {
    const result = confirm("Are you sure you want to delete this posted Job?");
    if (result) {
        const request = fetch('/delete-job/'+ id, {method: 'POST'});
        request.then((response) => {
            if (response.ok) {
                location.reload();
            }
        })
    }
}


