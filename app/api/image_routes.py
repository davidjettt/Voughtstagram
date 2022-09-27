from flask import Blueprint, request
# from app.models import db, Image
from flask_login import current_user, login_required
from app.api.s3_image_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.post("")
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "Image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "File type not permitted, must be .png, .jpg, .jpeg, or .gif"}, 400

    image.filename = get_unique_filename(image.filename)
    # print(image.filename, "GETTING TO FILENAME")
    upload = upload_file_to_s3(image)
    # print(upload, ' GETTING TO UPLOAD')
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # print(current_user, "CURRENT USER ID")
    # new_image = Image(user_id=current_user.id, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}
