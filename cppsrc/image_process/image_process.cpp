#include "image_process.h"
#include <typeinfo>
#include <iostream>
#include <boost/filesystem.hpp>
#include <opencv2/opencv.hpp>

namespace fs = boost::filesystem;

Napi::Object imageProcess::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("ConvertImageFormat", Napi::Function::New(env, imageProcess::ConvertImageFileFormat));
    exports.Set("RenameImageFile", Napi::Function::New(env, imageProcess::RenameImageFile));
    exports.Set("RescaleImageFileSize", Napi::Function::New(env, imageProcess::RescaleImageFileSize));
    exports.Set("ResizeImageFile", Napi::Function::New(env, imageProcess::ResizeImageFile));
    return exports;
}

Napi::Value imageProcess::ConvertImageFileFormat(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    Napi::String ext = info[1].As<Napi::String>();
    cv::Mat image;

    for(auto& file: fs::directory_iterator(folder_path.ToString().Utf8Value().c_str())) {
        if(file.path().extension() == ".png" || file.path().extension() == ".PNG" || file.path().extension() == ".jpeg" || file.path().extension() == ".JPEG") {
            image = cv::imread(file.path().string());
            cv::imwrite(file.path().stem().string() + ".jpg", image);
        }
    }
    return Napi::String::New(env, "Image format converted successfully");
}

Napi::Value imageProcess::RenameImageFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    Napi::String ext = info[1].As<Napi::String>();

    for(auto& file: fs::directory_iterator(folder_path.ToString().Utf8Value().c_str())) {
        if(file.path().extension() == ext) {
            fs::path new_name = file.path().stem().string() + "_new" + ext.ToString().Utf8Value().c_str();
            fs::rename(file.path(), new_name);
        }
    }
    return Napi::String::New(env, "Image renamed successfully");
}

Napi::Value imageProcess::RescaleImageFileSize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    cv::Mat image, resize_image;
    double scale = 0.5;

    for(auto& file: fs::directory_iterator(folder_path.ToString().Utf8Value().c_str())) {
        if(file.path().extension() == ".png") {
            image = cv::imread(file.path().string());
            cv::resize(image, resize_image, cv::Size(), scale, scale);
            cv::imwrite(file.path().stem().string() + "_resized.png", resize_image);
        }
    }
    return Napi::String::New(env, "Image resized successfully");
}

Napi::Value imageProcess::ResizeImageFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    cv::Mat image, resize_image;
    cv::Size size(640, 480);

    for(auto& file: fs::directory_iterator(folder_path.ToString().Utf8Value().c_str())) {
        if(file.path().extension() == ".png") {
            image = cv::imread(file.path().string());
            cv::resize(image, resize_image, size);
            cv::imwrite(file.path().stem().string() + "_resized.png", resize_image);
        }
    }
    return Napi::String::New(env, "Image resized successfully");
}