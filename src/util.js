export function error(res, status, message) {
  console.log(`ERROR ${status} = ${message}`);
  res.status(status)
    .format({html: () => res.send('<p>' + message + '</p>'),
             text: () => res.send(message),
             json: () => res.json({message: message})});
}
