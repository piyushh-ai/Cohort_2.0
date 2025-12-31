import React from 'react'


const ScrollImg = () => {

    let images = [
        "https://framerusercontent.com/images/iGJfAf2BBFYE0uwViOtIPVvJjA.jpg?scale-down-to=512&width=1080&height=1080",
        "https://framerusercontent.com/images/V1wVnhBMuFwk1ZUo0k6uZQh1ink.jpg?scale-down-to=512&width=1035&height=1035",
        "https://framerusercontent.com/images/fnL2kczrs3yW4kS2FFHJ30YAaE.jpg?scale-down-to=512&width=1056&height=1056",
        "https://framerusercontent.com/images/xXAUBJJ80pxKWXv9Ut38ZPh8F8.jpg?scale-down-to=512&width=1080&height=1080",
        "https://framerusercontent.com/images/Hh0oQdVW06V0ennDxzfAVpmyqJo.jpg?scale-down-to=512&width=1042&height=1042",
        "https://framerusercontent.com/images/l7UuMzL7t9Rw5bxksyb9WFCEpY4.jpg?scale-down-to=1024&width=1064&height=1099",
        "https://framerusercontent.com/images/m65PfG3sdXuuFDaDVSu0y5CcxBA.jpg?scale-down-to=512&width=1064&height=1064",
        "https://framerusercontent.com/images/iGJfAf2BBFYE0uwViOtIPVvJjA.jpg?scale-down-to=512&width=1080&height=1080",
        "https://framerusercontent.com/images/V1wVnhBMuFwk1ZUo0k6uZQh1ink.jpg?scale-down-to=512&width=1035&height=1035",
        "https://framerusercontent.com/images/fnL2kczrs3yW4kS2FFHJ30YAaE.jpg?scale-down-to=512&width=1056&height=1056",
        "https://framerusercontent.com/images/iGJfAf2BBFYE0uwViOtIPVvJjA.jpg?scale-down-to=512&width=1080&height=1080",
        "https://framerusercontent.com/images/V1wVnhBMuFwk1ZUo0k6uZQh1ink.jpg?scale-down-to=512&width=1035&height=1035",
        "https://framerusercontent.com/images/fnL2kczrs3yW4kS2FFHJ30YAaE.jpg?scale-down-to=512&width=1056&height=1056",
        "https://framerusercontent.com/images/xXAUBJJ80pxKWXv9Ut38ZPh8F8.jpg?scale-down-to=512&width=1080&height=1080",
        
        "https://framerusercontent.com/images/V1wVnhBMuFwk1ZUo0k6uZQh1ink.jpg?scale-down-to=512&width=1035&height=1035",
        "https://framerusercontent.com/images/fnL2kczrs3yW4kS2FFHJ30YAaE.jpg?scale-down-to=512&width=1056&height=1056",
        "https://framerusercontent.com/images/iGJfAf2BBFYE0uwViOtIPVvJjA.jpg?scale-down-to=512&width=1080&height=1080",
        "https://framerusercontent.com/images/V1wVnhBMuFwk1ZUo0k6uZQh1ink.jpg?scale-down-to=512&width=1035&height=1035",
        "https://framerusercontent.com/images/fnL2kczrs3yW4kS2FFHJ30YAaE.jpg?scale-down-to=512&width=1056&height=1056",
        "https://framerusercontent.com/images/xXAUBJJ80pxKWXv9Ut38ZPh8F8.jpg?scale-down-to=512&width=1080&height=1080",

    ]

  return (
    <div className="slider border h-80 w-full bg-[#F2EBE8] overflow-hidden flex items-center justify-center ">
      <div className="track flex gap-10 h-[80%]">
        {[...images].map((img, i) => (
          <div key={i} className="w-80  shrink-0">
            <img
              src={img}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollImg
