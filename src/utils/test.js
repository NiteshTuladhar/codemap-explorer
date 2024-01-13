function functionExpressionType1() {
    console.log("This is function one");
  }
  
  const functionExpressionType2 = function (parameters) {
    // Function body
  };
  
  const arrowFunctionExpression = (parameters) => {
    // Function body
  };
  
  const arrowFunctionExpressionWithImplicitReturn = (parameters) => expression;
  
  const functionConstructor = new Function("parameters", "function body");
  
  async function asyncFunction(parameters) {
    // Async function body
  }
  
  class MyComponent extends React.Component {
    myMethod() {
      // Method body
    }
  
    render() {
      // Component rendering logic
    }
  }
  
  function MyFunctionalComponent() {
    const myFunctionValidHere = () => {
      // Function body
    };
  
    return (
      // Component rendering logic
    );
  }
  
  const NotesContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const { test } = useContext(null);
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("@darkModeState", darkMode.toString());
        await AsyncStorage.setItem(
          "@darkModeSwitchToggle",
          isSwitchOn.toString()
        );
      } catch (e) {
        console.log(`error`, e);
      }
    };
    //USER AUTHENTICATION
  
    const userRegister = async (email, password) => {
      console.log("email and password", email, password);
      setIsLoading(true);
    };
  
    const getStoreData = async () => {
      try {
        const value = await AsyncStorage.getItem("@darkModeState");
        if (value !== null) {
          //converting sting to boolean as async storage does not store boolean
  
          if (value === "true") {
            var val = JSON.parse("true".toLowerCase());
          } else {
            var val = JSON.parse("false".toLowerCase());
          }
          setDarkMode(val);
        }
      } catch (e) {
        // error reading value
      }
    };
  
    return (
      <NotesContext.Provider
        value={{
          notes,
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  };
  
  export function createRandomFollower(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + " " + lastName;
    return {
      id: faker.string.uuid(),
      photo: faker.image.avatar(),
      name,
      verified: Math.random() >= 0.5,
      bio: faker.person.bio(),
      username: faker.internet.userName(),
      link: faker.internet.url(),
    };
  }
  export function createRandomuser(): User {
    return {
      id: faker.string.uuid(),
      photo: faker.image.avatar(),
      name: faker.person.firstName() + " " + faker.person.lastName(),
      verified: Math.random() >= 0.5,
      bio: faker.person.bio(),
      username: faker.internet.userName(),
      link: faker.internet.url(),
      followers: new Array(Math.floor(Math.random() * 10))
        .fill(null)
        .map((_) => createRandomFollower()),
    };
  }
  
  export function createRandomThread(): Thread {
    const author = createRandomuser();
    const mentionUser = createRandomuser();
  
    return {
      id: faker.string.uuid(),
      author,
      content: faker.lorem.paragraph(),
      image:
        Math.random() > 0.5
          ? new Array(Math.floor(Math.random() * 5))
              .fill(null)
              .map((_) => faker.image.url())
          : undefined,
      replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => ({
        id: faker.string.uuid(),
        author: createRandomuser(),
        content: faker.lorem.sentence(),
        likes: Math.floor(Math.random() * 1000),
        createAt: faker.date.recent().toISOString(),
      })),
      repliesCount: Math.floor(Math.random() * 100),
      likesCount: Math.floor(Math.random() * 1000),
      mention: Math.random() > 0.5,
      mentionUser,
      createdAt: faker.date.recent().toISOString(),
    };
  }
  
  export function generateThreads(): Thread[] {
    return new Array(50).fill(null).map((_) => createRandomThread());
  }
  
  export default NotesContextProvider;