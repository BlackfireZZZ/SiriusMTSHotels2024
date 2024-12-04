from application import db, app
from application.handle_conversation.conversation_routes import conversation_blueprint
from application.handle_hotel.hotel_routes import hotel_blueprint

app.register_blueprint(conversation_blueprint, url_prefix='/conversation')
app.register_blueprint(hotel_blueprint, url_prefix='/hotel')

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
