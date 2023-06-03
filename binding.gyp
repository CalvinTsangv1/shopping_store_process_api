{
    "targets": [{
        "target_name": "testaddon",
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "../header",
            "/usr/include/opencv4",
            "/usr/include",
        ],
        "cflags!": [ "" ],
        "cflags_cc!": [ "-fno-rtti" ],
        "sources": [
            "cppsrc/main.cpp",
            "cppsrc/image_process/image_process.cpp"
        ],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
        'conditions': [
            [
            "OS==\"ubuntu\"", {
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
            ],
            [ "OS=='linux'", {
                "cflags+": [ "-std=c++11", "-fexceptions" ],
                "cflags_c+": [ "-std=c++11", "-fexceptions" ],
                "cflags_cc+": [ "-std=c++11", "-fexceptions" ],
                "GCC_ENABLE_CPP_RTTI": "YES",
                "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
          }],
      ]
    }]
}