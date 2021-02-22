# SiincTv
## www.siinc.tv
## You can access the full documentation (created using jsdoc) at our github pages page https://galzai.github.io/SiincTv/index.html   

### Stream together
SiincTv is a web application designed to allow live streamers to schedule and syncronize group-streams from the selected platform together with other streamers - without platform dependency.
It also allows viewers to tune in to their favorite streamers group streams and be able to watch the action from all the group members perspective.

### Currently Implemented:
* Shared streams with youtube and twitch.
* Friends and friend requests.
* Real time update of live stream.
* Full user and stream search.
* Stream chat.
* Data caching and quick DB updates.
* All requests are handled by server -> credentials required for certain actions.
* Immediate shared stream creation (friend invite only).
* Notifications.
* Invitation based stream creation
* Requests to join stream
* Followers/Following
* Auto scaleable UI
* Full/Split screen mode.

### Backend:
* NodeJs.
* Express
* MongoDb + Mongoose for Database.
* Bcrypt for password encryption.
* Passport for authentication.
* SocketIO for real time.
* Node cache for caching
* Twitch API.
* Google API.
* Youtube Data V3 API.
* NodeCache

### Frontend:
* React.
* Axios.
* SocketIO.
* Twitch API.
* Google API.
* Youtube Data V3 API.
* Material-Ui

### Deployment
* AWS EC2
* NameCheap domain + premiumDNS
* Nginx for reverse proxy
* PM2 for running the server
* Certbot for SSL 

