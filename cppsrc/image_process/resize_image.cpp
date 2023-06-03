#include "resize_image.h"
#include <opencv2/opencv.hpp>
#include <boost/filesystem.hpp>
#include <iostream>

namespace fs = boost::filesystem;
using imageProcess::ResizeImage;

Napi::Object ResizeImage::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "ResizeImage", {
        InstanceMethod("resizeImageFile", &ResizeImage::ResizeImageFile)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("ResizeImage", func);
    return exports;
}

ResizeImage::ResizeImage(const Napi::CallbackInfo& info) : Napi::ObjectWrap<ResizeImage>(info) {
    jsFnRef = Napi::Persistent(info[0].As<Napi::Function>());
    jsFn = info[0].As<Napi::Function>();
}

void ResizeImage::ResizeImageFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    cv::Mat image, resize_image;
    cv::Size size(640, 480);

    for(auto& file: fs::directory_iterator(folder_path)) {
        if(file.path().extension() == ".png") {
            image = cv::imread(file.path().string());
            cv::resize(image, resize_image, size);
            cv::imwrite(file.path().stem().string() + "_resized.png", resize_image);
        }
    }
    jsFnRef.Call({});
}