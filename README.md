Hướng dẫn Full Stack TypeScript, GraphQL, Apollo, React & Next.js from Henry Web Dev

- ytb : <https://www.youtube.com/watch?v=1UMNUbtzQXk>

# Upload image

- test postman for body
  operations : {"query":"mutation AddProfilePicture($file: Upload!){ addProfilePicture(file: $file){ url } }"}
  map : { "0": ["variables.file"] }
  0 : File
- app.use(express.static('public'));
- app.get("/\*", (req, res) => {
  res.sendFile(path.join(\_\_dirname, `../public/images/${req.path}`));
  });

# Plans

- DAY 12/05/2022 (40phut)
- DAY 13/05/2022 (40phut -> 1h54phut)
- DAY 15/05/2022 (1h54phut -> 2h30phut)
- DAY 16/05/2022 (2h30phut -> 5h05phut)
- DAY 17/05/2022 (Implement upload images server)
- DAY 19/05/2022 (5h05phut -> 5h20phut)
- DAY 20/05/2022 (5h20phut -> 6h27phut)
- DAY 21/05/2022 (Implement i18next)
- DAY 23/05/2022 (6h27phut -> 6h47phut)
- DAY 24/05/2022 (6h47phut -> 7h36phut)
- DAT 29/05/2022 (7h36phut -> 12h22phut)

- install DB : <https://www.youtube.com/watch?v=QaZrWIvAFsA>

# CREATEB DB WITH TERMINAL

- CREATE DATABASE reddit;

GET LIST DATABASE WITH TERMINAL

- psql
- \list

# GENERATED GRAPHQL

- yarn codegen

# Password pgadmin 4

123123

# START locahost

- cd server
- yarn
- yarn server-ts

# GRAGHQL

- mutations login

```mutation Login {
    login(loginInput: {
      usernameOrEmail:"phu98@gmail.com",
      password:"123123"
    }){
      code
      success
      message
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
```

- mutations register

```
mutation Register {
  register (registerInput:{
    username:"vue"
    email:"vue@gmail.com"
    password:"123123"
  }){
    code
    success
    message
    user {
      id
      username
      email
      createdAt
    }
    errors {
      field
      message
    }
  }
}
```

- mutation create post

```
  mutation CreatePost {
    createPost(createPostInput : {
      title:"reactjs nextjs",
      text:"leaning"
    }){
      code
      success
      message
      post {
        id
        title
      }
    }
  }
```

- query get all posts

```
query GetPost {
		posts {
			id
      title
      userId
    }
}
```

- mutations update post

```
  mutation UpdatePost {
    updatePost(updatePostInput:{
      id:1
      title:"update title"
      text:"update text"
    }){
      code
      message
      success
      post {
        title
        userId
      }
      errors{
        field
        message
      }
    }
  }
```

- query get profile

```
  query Me {
    me {
      id
      username
      email
    }
  }
```
