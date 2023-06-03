#include "convert_image_format.h"
#include <typeinfo>
#include <iostream>
#include <boost/filesystem.hpp>
#include <opencv2/opencv.hpp>

namespace fs = boost::filesystem;
using imageProcess::ConvertImageFormat;

Napi::Object ConvertImageFormat::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "ConvertImageFormat", {
        InstanceMethod("ConvertImageFileFormat", &ConvertImageFormat::ConvertImageFileFormat)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("ConvertImageFormat", func);
    return exports;
}

ConvertImageFormat::ConvertImageFormat(const Napi::CallbackInfo& info) : Napi::ObjectWrap<ConvertImageFormat>(info) {
    jsFnRef = Napi::Persistent(info[0].As<Napi::Function>());
    jsFn = info[0].As<Napi::Function>();
}

Napi::Value ConvertImageFormat::ConvertImageFileFormat(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    Napi::String ext = info[1].As<Napi::String>();
    cv::Mat image;

    for(auto& file: fs::directory_iterator(folder_path)) {
        if(file.path().extension() == ".png" || file.path().extension() == ".PNG" || file.path().extension() == ".jpeg" || file.path().extension() == ".JPEG") {
            image = cv::imread(file.path().string());
            cv::imwrite(file.path().stem().string() + ".jpg", image);
        }
    }
    return Napi::String::New(env, "Image format converted successfully");
}