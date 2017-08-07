angular.module('starter').controller('uploadController',function($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet,$localstorage,$ionicLoading,$state,$http,ionicToast){

    $scope.image = null;
    $scope.showAlert = function(title, msg) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: msg
        });
    };

    $scope.loadImage = function() {
      var options = {
        title: 'Select Image Source',
        buttonLabels: ['Load from Library', 'Use Camera'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton : true,
      };
      $cordovaActionSheet.show(options).then(function(btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };
    $scope.selectPicture = function(sourceType) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imagePath) {
        var currentName = imagePath.replace(/^.*[\\\/]/, '');
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";

        if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function(entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                $scope.image = newFileName;
              }, function(error){
                $scope.showAlert('Error', error.exception);
              });
            };
          }
        );
        } else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        }
      },
      function(err){
      })
    };
    $scope.pathForImage = function(image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };
    $scope.uploadImage = function() {
      var url = "http://localhost/test/upload.php";

      var targetPath = $scope.pathForImage($scope.image);

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data"
      };
      $ionicLoading.show({
                            template : "Please wait...."
                    });
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
          $ionicLoading.hide();
        //success or error result
      });
    }
})
