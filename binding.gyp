{
    "targets": [{
        "target_name": "testaddon",
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "../header",
            "/opt/homebrew/Cellar/opencv/4.7.0_4/include/opencv4",
        ],
        "libraries": [
             "/opt/homebrew/Cellar/opencv/4.7.0_4/lib/lib*.*"
        ],
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-rtti,-fno-exceptions" ],
        "sources": [
            "cppsrc/image_process/convert_image_format.cpp",
            "cppsrc/image_process/rename_file.cpp",
            "cppsrc/image_process/rescale_image_size.cpp",
            "cppsrc/image_process/resize_image.cpp",
            "cppsrc/main.cpp",
        ],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
        'conditions': [
            [
            "OS==\"mac\"", {
                "xcode_settings": {
                "OTHER_CFLAGS": [
                    "-mmacosx-version-min=10.7",
                    "-std=c++11",
                    "-stdlib=libc++"
                ],
                "GCC_ENABLE_CPP_RTTI": "YES",
                "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
                }
            }
            ]
      ]
    }]
}