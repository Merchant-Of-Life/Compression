const imageinput = document.getElementById('imageinput');
const fileinfo = document.getElementById('fileinfo');
const preview = document.getElementById('preview');

const qualitySlider= document.getElementById('qualitySlider');
const qualityValue= document.getElementById('qualityValue');

const compressBtn = document.getElementById('compressBtn');
const compressedPreview = document.getElementById('compressedPreview');
const compressedInfo = document.getElementById('compressedInfo');

const downloadBtn = document.getElementById('downloadBtn');

const dropzone = document.getElementById('dropzone');

imageinput.addEventListener('change', function () {
    const file = imageinput.files[0];
    fileinfo.innerText = "selected: " + file.name + " (" + Math.round(file.size / 1024) + "KB";
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
});
    qualitySlider.addEventListener('input', function () {
    qualityValue.innerText = qualitySlider.value;
});
compressBtn.addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    ctx.drawImage(preview, 0, 0);

    const quality = qualitySlider.value /100;

    canvas.toBlob(function (blob) {
        const compressedUrl = URL.createObjectURL(blob);
        compressedPreview.src = compressedUrl;
        compressedPreview.style.display = 'block';

    const newSizeKB = Math.round(blob.size / 1024);
    
    compressedInfo.innerText = "compressed Size: " + newSizeKB + " KB (" + qualitySlider.value + "% Quality)";
    downloadBtn.href = compressedUrl;
    downloadBtn.download = "compressed_" + imageinput.files[0].name.replace(/\.[^/.]+$/, "") + ".jpg";
    downloadBtn.style.display = 'inline-block';
    }, 'image/jpeg', quality);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = '#72091c';
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, function (e) {
        e.preventDefault();
        dropzone.style.borderColor = '#b08968';
    });
});

dropzone.addEventListener('drop', function (e) {
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
        imageinput.files = droppedFiles;
        imageinput.dispatchEvent(new Event('change'));
    }
});
