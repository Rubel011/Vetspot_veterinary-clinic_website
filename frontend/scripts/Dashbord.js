const imageUpload = document.getElementById('image-upload');
const userImage = document.getElementById('user-image');

imageUpload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    userImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
});
