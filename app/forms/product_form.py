from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, FloatField, SubmitField
# from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, NumberRange

# for decimal price
def validate_price(form, field):
    # Check if the price has more than two decimal places
    if field.data and round(field.data, 2) != field.data:
        raise ValidationError('Price must not have more than 2 decimal places.')
    

class CreateProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    # image = FileField("Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]) # for aws test
    image = StringField("Image", validators=[DataRequired()]) # for postman test
    price = FloatField("Price", validators=[DataRequired(), validate_price, NumberRange(min=0)])
    # price = IntegerField("Price", validators=[DataRequired()]) # for integer price
    submit = SubmitField("Submit")
    