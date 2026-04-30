# AI-System

**NOTE:** Here for the starting phase we do not use some paid API key but we use some freely available Model and hosting through ollama which is like the docker for LLMs

### STEPS TO SETUP
* Install Ollama through 
  * For mac: ```curl -fsSL https://ollama.com/install.sh | sh```
  * For Linux: ```curl -fsSL https://ollama.com/install.sh | sh```
  * For windows: ```irm https://ollama.com/install.ps1 | iex```
* If you have better GPU like RTX 3090,4090 you can run this below model perfectly with the higher size model or else you can install the lesser size one!!! 
* **run the command** ```ollama run qwen2.5:14b``` after setting up the ollama [I installed the Qwen2.5 14b params which takes around 6GB of VRAM] and takes around 9GB. If your system cannot handle that you can use some smaller versions as well.
* through the function ```call_local_llm(prompt)``` present in the local_llm file of agentic_system app in the backend, you can ask anything to get a response in return.
* we use this model because it is focussed for the long conversations in a structured format and better for linguistic responses with not really focussing on the logical and coding tasks.
* **NOTE:** whenever the local_llm is accessed make sure that you have that llm is running through ollama in your system.


# Backend
### STEPS TO SETUP

* Clone the repository ```git clone https://github.com/harshith0518/Amaithi.git```
* You can see the "backend" and "frontend" folder 
* For backend setup open the terminal and setup the python environment with 
  * ```python -m venv .venv``` To create virtual environment of python in a file named ".venv"
  * activate it by finding the executable activate file 
    ```.\.venv\Scripts\activate``` [may variate in mac/linux] 
  * ```cd backend``` to go to the backend
  * ```pip install < requirements.txt``` to install the required libraries
  * Note that yuo may need the environment variables which will be sent personally within the team
* connect the Database

# Frontend
* For frontend setup open another terminal and go to frontend folder [```cd frontend```]
* type ```npm run dev``` and then ```npm run dev``` to run the frontend locally
* 

# DataBase
* For now we are just using the dockerized postgres database
* To create this :
  * ```docker run --name name_to_show -e POSTGRES_DB=db_name -e POSTGRES_USER=user_name -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15``` [note that we are building the continaer of the postgres DB through the postgres image present in the dockerhub]
  * Note that all the required variables and included in the .env file of the project to run with the backend.
  * **to open DB which is in the container**: ```docker exec -it name_to_show psql -U user_name -d db_name```

# Next targets
* Implement the authentication, pages and the frontend design tomorrow EOD.
* use docker-compose for the llm image, backend and DB image.
* implementing the agentic architecture through the LLM included


# Future enhancements 
* we have to add the peridics deletion of the otps for scalability [for now we are just using and storing the otps]
