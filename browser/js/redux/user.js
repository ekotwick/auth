import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */


const CREATE     = 'CREATE_USER';
export const REMOVE = 'REMOVE_USER';
const UPDATE     = 'UPDATE_USER';
const SET = 'SET_CURRENT_USER';
const UNSET = 'UNSET'


/* ------------   ACTION CREATORS     ------------------ */


const create = user  => ({ type: CREATE, user });
export const remove = id    => ({ type: REMOVE, id });
const update = user  => ({ type: UPDATE, user });
const set = user => ({ type: SET, user });
const unSet = user => ({ type: UNSET, user });


/* ------------       REDUCER     ------------------ */

export default function reducer (user = {}, action) {

  switch (action.type) {

    // case CREATE:
    //   return [action.user, ...users];

    case UNSET:
      return action.user;
    // case REMOVE:
    //   return users.filter(user => user.id !== action.id);

    // case UPDATE:
    //   return users.map(user => (
    //     action.user.id === user.id ? action.user : user
    //   ));

    case SET:
      return action.user;

    default:
      return user;
  }
}


/* ------------       DISPATCHERS     ------------------ */

// export const fetchUsers = () => dispatch => {
//   axios.get('/api/users')
//        .then(res => dispatch(init(res.data)));
// };

// optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};

export const setUser = (user) => dispatch => {
  axios.post(`api/users/login`, user)
    .then(res => {
      console.log(res.data, 'res.data');
      dispatch(set(res.data))
    })
    .catch(err => console.error(`Setting user: ${user} unsuccesful`,
      err));
};

export const unSetUser = () => dispatch => {
  
  dispatch(unSet({}));
};

export const createUser = (user) => dispatch => {
  axios.post(`api/users/signup`, user)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Setting user: ${user} unsuccesful`,
      err));
};


// router.post('/login', function(req,res,next){
//   User.findOne({
//     where: { email: req.body.email,
//             password: req.body.password
//           }
//     })
//     .then(foundPerson => {
//       if(!foundPerson) res.sendStatus(401)
//       else {
//         req.session.userId = foundPerson.id
//         res.sendStatus(200)
//       }
//     })
//     .catch(next)

// });
