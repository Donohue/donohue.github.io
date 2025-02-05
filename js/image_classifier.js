async function fetchImage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Non-200 response: ' + response.status)
            return undefined;
        }
        var content_type = response.headers.get("content-type")
        if (content_type != "image/jpeg" && content_type != "image/png") {
            console.log('URL provided had invalid image type ' + content_type);
            return undefined;
        }
        var image_blob = await response.blob();
        return image_blob
    } catch (e) {
        console.log('Exception: ' + e);
        return undefined
    }
}

function imageToFile(imageUrl, blob) {
    const fileName = imageUrl.split('/').pop().split('?')[0];
    return new File([blob], fileName, { type: blob.type });
}

async function predictResult(imagePath) {
    var url = 'https://bthdonohue-hotdog-or-cheeseburger.hf.space/gradio_api/call/predict'
    try {
        var response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'data': [{"path": imagePath}]})
        });
        if (!response.ok) {
            console.log('Error creating prediction: ' + response.status);
            return undefined;
        }
        var data = await response.json();
        var eventId = data['event_id'];
        var response = await fetch(url + '/' + eventId);
        
        const text = await response.text();
        if (!text.startsWith('event: complete')) {
            console.log('Incomplete event');
            return undefined;
        }

        const jsonPart = text.split("data: ")[1]
        return JSON.parse(jsonPart);
    } catch (e) {
        console.log('Exception: ' + e);
        return undefined;
    }
}

function resetResult() {
    const label = document.getElementById("image_classifier_label");
    const hotdogConfidenceLabel = document.getElementById('image_classifier_confidence_hotdog');
    const cheeseburgerConfidencelabel = document.getElementById('image_classifier_confidence_cheeseburger');
    label.textContent = '';
    hotdogConfidenceLabel.textContent = '';
    cheeseburgerConfidencelabel.textContent = '';
}

function handleResult(results) {
    if (results.length == 0) {
        return;
    }
    const result = results[0];
    const label = document.getElementById("image_classifier_label");
    const hotdogConfidenceLabel = document.getElementById('image_classifier_confidence_hotdog');
    const cheeseburgerConfidencelabel = document.getElementById('image_classifier_confidence_cheeseburger');
    const hotdogConfidence = result.confidences.filter((confidence) => confidence.label == 'Hotdog')[0]
    const cheeseburgerConfidence = result.confidences.filter((confidence) => confidence.label == 'Cheeseburger')[0]
    label.textContent = result.label;
    hotdogConfidenceLabel.textContent = hotdogConfidence.label + ': ' + Number(hotdogConfidence.confidence).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0});
    cheeseburgerConfidencelabel.textContent = cheeseburgerConfidence.label + ': ' + Number(cheeseburgerConfidence.confidence).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0});
}

document.addEventListener('DOMContentLoaded', function() {
    const imageDemos = document.getElementsByClassName('image_classifier_demo_image');
    for (var i = 0; i < imageDemos.length; i++) {
        const imageDemo = imageDemos[i];
        imageDemo.onclick = async function(e) {
            resetResult();
            const imagePath = imageDemo.getAttribute('predict');
            const result = await predictResult(imagePath);
            if (result == undefined) {
                alert('There was a problem with that request. Please try again!');
            }
            else {
                handleResult(result);
            }
        };
    }
});
