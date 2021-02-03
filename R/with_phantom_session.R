#' @export
with_phantom_session <- function(f, ...) {
    phantomjs <- run_phantomjs()
    phantom_session <- Session$new(port = phantomjs$port)
    on.exit(phantomjs$process$kill())
    args <- c(list(phantom_session), ...)
    do.call(f, args)
}
