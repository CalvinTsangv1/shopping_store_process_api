#include "rescale_image_size.h"
#include <opencv2/opencv.hpp>
#include <boost/filesystem.hpp>
#include <iostream>

namespace fs = boost::filesystem;
using imageProcess::RescaleImageSize;

Napi::Object RescaleImageSize::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "RescaleImageSize", {
        InstanceMethod("rescaleImageSize", &RescaleImageSize::RescaleImageFileSize)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("RescaleImageSize", func);
    return exports;
}

RescaleImageSize::RescaleImageSize(const Napi::CallbackInfo& info) : Napi::ObjectWrap<RescaleImageSize>(info) {
    jsFnRef = Napi::Persistent(info[0].As<Napi::Function>());
    jsFn = info[0].As<Napi::Function>();
}

void RescaleImageSize::RescaleImageFileSize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    cv::Mat image, resize_image;
    double scale = 0.5;

    for(auto& file: fs::directory_iterator(folder_path)) {
        if(file.path().extension() == ".png") {
            image = cv::imread(file.path().string());
            cv::resize(image, resize_image, cv::Size(), scale, scale);
            cv::imwrite(file.path().stem().string() + "_resized.png", resize_image);
        }
    }
    jsFnRef.Call({});
}
