#include "rename_file.h"
#include <boost/filesystem.hpp>
#include <iostream>

namespace fs = boost::filesystem;
using imageProcess::RenameFile;

Napi::Object RenameFile::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "RenameFile", {
        InstanceMethod("renameImageFile", &RenameFile::RenameImageFile)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("RenameFile", func);
    return exports;
}

RenameFile::RenameFile(const Napi::CallbackInfo& info) : Napi::ObjectWrap<RenameFile>(info) {
    jsFnRef = Napi::Persistent(info[0].As<Napi::Function>());
    jsFn = info[0].As<Napi::Function>();
}

void RenameFile::RenameImageFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String folder_path = info[0].As<Napi::String>();
    Napi::String ext = info[1].As<Napi::String>();

    for(auto& file: fs::directory_iterator(folder_path)) {
        if(file.path().extension() == ext) {
            fs::path new_name = file.path().stem().string() + "_new" + ext.ToString().Utf8Value().c_str();
            fs::rename(file.path(), new_name);
        }
    }
    jsFnRef.Call({});
}