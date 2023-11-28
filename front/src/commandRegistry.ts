import { REPLInputProps } from './components/REPLInput';
import { addOutput } from './components/REPLInput';


interface REPLFunction {
    (mode: boolean, props: REPLInputProps, commandString: string, command: string[]): void
  }



  // This function is called when the view command is submitted and accesses
  // a mocked csv file to be shown as the output.
  function view(mode: boolean, props: REPLInputProps, commandString: string, output: string[][]) {
    addOutput(mode, props, commandString, output);
  // TODO: add checking for whether file loaded!
}

//broadband Louisiana Jefferson%20Parish,%20Louisiana
function broadband(mode: boolean, props: REPLInputProps, commandString: string, command: string[]) {
  const args = command.slice(1);
  fetch("http://localhost:3232/broadband?state=" + args[0] + "&county=" + args[1])
    .then(response => response.json())
    .then(json => {if (json.type === "success") {view(mode, props, commandString, [[json.county_name + " in the state of " + json.state_name +" has a broadband coverage percent of: " + json.broadband_data + "%"]])}
  else {
    view(mode, props, commandString, [["No result found for given search parameters"]])
  }})
}

// This function handles mocked search functionality. Checks for if the search
// parameters leads to one of our projected results. Returns informative errors.
function search(mode: boolean, props: REPLInputProps, commandString: string, command: string[]) {
  const args = command.slice(1);
  if(args.length === 1) {
    fetch("http://localhost:3232/searchcsv?keyword=" + args[0] + "&search_type=0")
    .then(response => response.json())
    // .then(json => json.search_results)
    .then(json => {
      if (json.type === "success") {
        const headers = [json.data_headers];
        const body = json.search_results;
        if (body.length === 0) {
          view(mode, props, commandString, [["No result found for given search parameters"]]);
        } else {
        if (headers[0].length != 0){
          view(mode, props, commandString, headers.concat(body))
        }
        else {
        view(mode, props, commandString, body);
        }
      }
      }
      else {
        view(mode, props, commandString, [["Invalid search"]]);
      }
  });
  }
  else if(args.length === 2) {
    // TODO: what if a searcher wants to use search 0, with search tpye specified. Then it gives 2 args. Not handled yet.
    // TODO: is parseInt legal???
    if(!isNaN(parseInt(args[1]))) {
      fetch("http://localhost:3232/searchcsv?keyword=" + args[0] + "&col_index=" + args[1] +"&search_type=1")
      .then(response => response.json())
      // .then(json => json.search_results)
      .then(json => {
        if (json.type === "success") {
          const headers = [json.data_headers];
          const body = json.search_results;
          if (body.length === 0) {
            view(mode, props, commandString, [["No result found for given search parameters"]]);
          } else {
          if (headers[0].length != 0){
            view(mode, props, commandString, headers.concat(body))
          }
          else {
          view(mode, props, commandString, body);
          }
        }
        }
        else {
          view(mode, props, commandString, [["Invalid search"]]);
        }
    });
    }
    else {
      fetch("http://localhost:3232/searchcsv?keyword=" + args[0] + "&col_name=" + args[1] + "&search_type=2")
      .then(response => response.json())
      // .then(json => json.search_results)
      .then(json => {
        if (json.type === "success") {
          const headers = [json.data_headers];
          const body = json.search_results;
          if (body.length === 0) {
            view(mode, props, commandString, [["No result found for given search parameters"]]);
          } else {
          if (headers[0].length != 0){
            view(mode, props, commandString, headers.concat(body))
          }
          else {
          view(mode, props, commandString, body);
          }
        }
        }
        else {
          view(mode, props, commandString, [["Invalid search"]]);
        }
    });
    }
  }
  else if(args.length === 3) {
    if(args[2] === "1") {
      fetch("http://localhost:3232/searchcsv?keyword=" + args[0] + "&col_index=" + args[1] +"&search_type=1")
      .then(response => response.json())
      // .then(json => json.search_results)
      .then(json => {
        if (json.type === "success") {
          const headers = [json.data_headers];
          const body = json.search_results;
          if (body.length === 0) {
            view(mode, props, commandString, [["No result found for given search parameters"]]);
          } else {
          if (headers[0].length != 0){
            view(mode, props, commandString, headers.concat(body))
          }
          else {
          view(mode, props, commandString, body);
          }
        }
        }
        else {
          view(mode, props, commandString, [["Invalid search"]]);
        }
    });
    }
    else if(args[2] === "2") {
      fetch("http://localhost:3232/searchcsv?keyword=" + args[0] + "&col_name=" + args[1] + "&search_type=2")
      .then(response => response.json())
      // .then(json => json.search_results)
      .then(json => {
        if (json.type === "success") {
          const headers = [json.data_headers];
          const body = json.search_results;
          if (body.length === 0) {
            view(mode, props, commandString, [["No result found for given search parameters"]]);
          } else {
          if (headers[0].length != 0){
            view(mode, props, commandString, headers.concat(body))
          }
          else {
          view(mode, props, commandString, body);
          }
        }
        }
        else {
          view(mode, props, commandString, [["Invalid search"]]);
        }
    });
    }
    else {
      addOutput(mode, props, commandString, [["Big error: REPLInput 125"]])
    }
  }
  // TODO: implement different types of searches!
  //      how do we want to implement? explicit search types? default? inferred from parameters? Maybe first two
  //      additional error checking!
}

// This function handles mocked load functionality. Checks for if the
// file provided leads to one of our projected datasets.
function handleLoad(mode: boolean, props: REPLInputProps, commandString: string, command: string[]) {
  // setFilename(command[1]);
  if (command[2] === "true") {
    fetch('http://localhost:3232/loadcsv?filepath=' + command[1] + "&headers=true")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load the file. Invalid file path or other error.');
      }
      return response.json();
    })
    //TODO: switch on response status for proper error messaging
      // check type field of JSON response -- if success, message. if error, error message.
      .then(json => {
        if (json.type === 'success') {
          addOutput(mode, props, commandString, [["successfully loaded file with headers"]]);
        } else if (json.type === 'error') {
          addOutput(mode, props, commandString, [["failed to load file: no such filename"]]);
        }
      })
      // .catch(error => {
      //   // Handle network errors or other issues
      //   addOutput(commandString, [['Error: ' + error.message]]);
      // });

  } else {
    fetch('http://localhost:3232/loadcsv?filepath=' + command[1] + "&headers=false")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load the file. Invalid file path or other error.');
      }
      return response.json();
    })
    .then(json => {
      if (json.type === 'success') {
        addOutput(mode, props, commandString, [["successfully loaded file without headers"]]);
      } else if (json.type === 'error') {
        addOutput(mode, props, commandString, [["failed to load file: no such filename"]]);
      }
    })
  }
}

//load_file back/data/dol_ri_earnings_disparity.csv true
//load_file C:\Users\philb\Documents\GitHub\repl-ryhuang-jphilbr1\back\data\census\dol_ri_earnings_disparity.csv true
function handleView(mode: boolean, props: REPLInputProps, commandString: string, command: string[]) {
  fetch('http://localhost:3232/viewcsv')
    .then(response => response.json())
    .then(json => {
      if (json.type === "success") {
        const headers = [json.data_headers];
        const body = json.data_body;
        if (headers[0].length != 0){
          // let output = headers.concat(body)
          // if (headers[0].equals(body[0])) {
          //   console.log("hi")
          // }
          view(mode, props, commandString, headers.concat(body))
        }
        else {
        view(mode, props, commandString, body);
      }
      } else {
        view(mode, props, commandString, [["There is no file loaded"]]);
      }
      
  });
}
  
export const userDefinedCommands = new Map<
  string,
  REPLFunction>();

userDefinedCommands.set("broadband", broadband)
userDefinedCommands.set("view", handleView)
userDefinedCommands.set("load_file", handleLoad)
userDefinedCommands.set("search", search)
