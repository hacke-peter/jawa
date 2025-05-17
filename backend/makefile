install: 
	conda env create --file ./backend/environment.yml
	activate eco-travel

update:
	activate eco-travel
	conda env update --file=./backend/environment.yml --prune
	
dev:
	activate eco-travel
	fastapi dev ./backend/main.py --port 5328

run: 
	activate eco-travel
	fastapi run ./backend/main.py --port 5328