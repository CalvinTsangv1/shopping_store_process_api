#OS image
FROM ubuntu:20.04

#set timezone
ENV TZ="America/New_York"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#System setup
RUN apt-get clean && apt-get update && apt-get install -y jq sudo curl wget gnupg build-essential git

# Yarn repo
RUN curl fsSL https://dl.yarnpkg.com/debian/pubkey.gpg -k | apt-key add 
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN sudo apt update

#RUN sudo apt -y install yarn 
RUN sudo apt install --no-install-recommends yarn
RUN echo yarn --version

#install nodejs 16.x
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

#install opencv
RUN sudo apt-get install manpages-dev -y
RUN sudo npm install -g node-gyp
RUN sudo apt-get install -y build-essential g++ python3-dev autotools-dev libicu-dev libbz2-dev libboost-all-dev libopencv-dev python3-opencv

#setup work directory and copy file


# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
COPY . /usr/src/app
#RUN yarn install
EXPOSE 5001
CMD ["tail", "-f", "/dev/null"]