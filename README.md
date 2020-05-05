## CUTEMO

백엔드는 **MongoDB와 Express**, 프론트엔드는 **React**를 통해서 구현되었습니다.  
모든 컴포넌트는 **React Hooks를 이용한 함수형 컴포넌트**를 활용했고, **리덕스를 통해서 상태 관리**를 했습니다.  
비동기 작업은 **axios와 Redux-Thunk**를 통해서 구현했고, UI는 **styled-component와 scss**를 통해서 만들었습니다.  

## 로그인 및 회원가입

![로그인 화면](https://drive.google.com/uc?id=1PkApa7ggXHFVMwsihP2X5t4GTwhPjOsL)  
회원가입시에 bcrypt를 통해서 사용자의 비밀번호를 암호화하고 jwt를 사용합니다.  

```js
// setPassword 메소드를 통해서 암호화

UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};
```

```js
// 사용자 정보를 기반으로 토큰 생성

UserSchema.methods.generateToken = function() {
  // 첫번째는 {넣을 데이터}, 두번째는 키, 세번째는 {옵션}
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
  return token;
};
```

## 메인 페이지

![메인 화면](https://drive.google.com/uc?id=1es8ir0V6ZUD8vdq-1rP81loj69ouhkVj)  
메인화면에서 글을 쓸 수 있고, 로그인한 사용자에게만 글쓰기 버튼이 보입니다.  
토큰은 쿠키에 저장하고, 만약에 쿠키에 토큰이 있다면 .req.user 값을 추가합니다.  
해당 값을 통해서 로그인 했는 지 안 했는지를 판단합니다.

```js
const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies["access_token"];
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    // 토큰이 3.5일 미만으로 남았다면 다시 만들어서 저장한다
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
  next();
};
```

메인 페이지 밑에는 페이지네이션이 구현되어있습니다.  
![페이지네이션](https://drive.google.com/uc?id=1FaBsaDsvD0XT1YWS5rnBoisCrKQxtI3p)  

## 글쓰기 화면 및 읽기 페이지

![글쓰기 화면](https://drive.google.com/uc?id=1ele54LszkXJrTPSpO9ldtcx38FkX12Yk)  
![읽기 페이지](https://drive.google.com/uc?id=1CQiB8KbCXXfyboePzDcmrPxFMS8pL55I)  