# Recon-Service
Military target management system

## Api Documentation

## Target

### `GET` all targets
*   **URL**

    `/target`
    
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": [
            {
              "id": 68,
              "reconunitid": 1,
              "altitude": "40",
              "longitude": "34.84358489157023",
              "latitude": "31.941086878728346",
              "azimuth": null,
              "size": 0,
              "type": "target",
              "reconunit_name" :"Headquarters",
              "createdon": "2018-06-01 16:24:08"
            }
        ]
    }
    ```
  
### `GET` target by id
*   **URL**

    `/target/:id`
      
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": {
            "id": 68,
            "reconunitid": 1,
            "altitude": "40",
            "longitude": "34.84358489157023",
            "latitude": "31.941086878728346",
            "azimuth": null,
            "size": 0,
            "type": "target",
            "reconunit_name" :"Headquarters",
            "createdon": "2018-06-01 16:24:08"
        }
    }
    ```
 
 *   **Error Response:**
 
      ```Json
      {
          "success": false,
          "error": "Record not found"
      }
      ```
 
 ### `POST` new target
 *   **URL**
 
      `/target`
    
 *   **body**
 
     ```Json
      {     
        "altitude": "22.23333",
        "longitude": "33.333323",
        "latitude": "120",
        "azimuth": "120",
        "size": 34,
        "type": "target"
      }
     ```
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```
 ### `PUT` update target
 *   **URL**
 
      `/target/:id`
    
 *   **body**
 
     ```Json
      {     
        "altitude": "22.23333",
        "longitude": "33.333323",
        "type": "target"
      }
     ```
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```
 ### `DELETE` delete target
 *   **URL**
 
      `/target/:id`
    
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```
     
## ReconUnit

### `GET` all reconunits
*   **URL**

    `/reconunit`
    
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "name": "headquarters"
            },
            {
                "id": 2,
                "name": "Yogev Heskia"
            }
        ]
    }
    ```
  
### `GET` reocnunit by id
*   **URL**

    `/reconunit/:id`
      
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": {
            "id": 1,
            "name": "headquarters",
            "longitude": "32.3232",
            "latitude": "34.342"
        }
    }
    ```
 
 *   **Error Response:**
 
      ```Json
      {
          "success": false,
          "error": "Record not found"
      }
      ```
 
 ### `POST` new reconunit
 *   **URL**
 
      `/reconunit`
    
 *   **body**
 
     ```Json
      {         
        "name":"testname"
      }
     ```
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```
 ### `PUT` update reconunit
 *   **URL**
 
      `/reconunit/:id`
    
 *   **body**
 
     ```Json
      {     
        "name":"avinew"
      }
     ```
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```

## Message

### `GET` all latest Messages on TimeFrame
*   **URL**

    `/message?timeFrame={number}`
*   **Prams**
    
    `timeFrame` : Masseges that was created less then then timeFrame.</br>
    If not set then uses a default timeFrame.</br>
    timeFrame=-1 to get all messages wihtou timeFrame</br>
    
    
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": [
            {
                "id": 2,
                "src_reconunitid": 1,
                "dest_reconunitid": 2,
                "message": "Warning!!",
                "createdon": "2018-06-02 13:04:39"
            }
        ]
    }
    ```
  
### `GET` all latest Messages destined  for Reconunit on TimeFrame
*   **URL**

    `/message/:id?timeFrame={number}`
    
*   **Prams**
    
    `timeFrame` : Masseges that was created less then then timeFrame.</br>
    If not set then uses a default timeFrame. </br>
    timeFrame=-1 to get all messages wihtou timeFrame.
    
    
    
      
*   **Success Response:**

    ```Json
    {
        "success": true,
        "data": [
            {
                "id": 2,
                "src_reconunitid": 1,
                "dest_reconunitid": 2,
                "message": "Warning!!",
                "createdon": "2018-06-02 13:04:39"
            }
        ]
    }
    ```
    
 ### `POST` new message
 *   **URL**
 
      `/message`
    
 *   **body**
 
     ```Json
        {
            "src_reconunitid": 1,
            "dest_reconunitid": 2,
            "message": "On your left"
        }
     ```
 *   **Success Response:**

     ```Json
      {
        "success": true,
        "data": ""
      }
     ```
